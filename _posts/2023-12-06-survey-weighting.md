---
title: How to conduct weighted survey analysis in R
date: 2023-12-06 19:00:00 +0100
categories: [Tutorial]
render_with_liquid: false
image: 
    path: /assets/img/weighting.png
---

When conducting surveys, the devil is in the detail. Bias is lurking throughout the process—from designing the questionnaire to collecting responses and analyzing results.

Common objections to surveys relate to the "representativeness" of results. You'll often hear stakeholders say things like “Are these results really reflecting our target group?” or “I'm concerned that only a very specific/biased group of people has taken this survey”, sometimes followed by "I never take surveys myself".

The truth is of course that a sample of survey respondents never fully reflects your target population (i.e. the group of people you want to draw conclusions about). So the question becomes how to **minimize error while accounting for the constraints and requirements of a given research initiative or businesss context**. To learn more about the different types of error in surveys, check out the concept of [*Total Survey Error*](https://academic.oup.com/poq/article/74/5/817/1815551) or read the excellent book [*Surveys That Work*](https://rosenfeldmedia.com/books/surveys-that-work/) by Caroline Jarrett.

## Why bother about weighted survey analysis?

Conducting a weighted survey analysis is not a holy grail to ensure representativeness or eliminate all types of bias. In fact, it's a lot more **important to select an appropriate study design, sampling strategy, questionnaire design, etc.** However, a weighted analysis is a powerful tool when making sense of the response data at the analysis stage.

Weighted analysis is particularly useful for **mitigating non-response bias**—the problem that people who take your survey might differ from those who don’t in ways that distort the results. This popular cartoon illustrates the point quite well.

![A cartoon illustrating non-response bias](/assets/img/sketchplanations-bias.png)
_Cartoon by[ sketchplanations](https://sketchplanations.com/sampling-bias). The original cartoon is named "Sampling Bias" but the phenomenon at play seems more related to non-response bias: People that don't like surveys are less likely to respond to them._

In reality, non-response bias is more subtle of course. A typical pattern in a business context can be that more engaged customers (i.e., those that use a product or service more often) are more likely to take part in a survey than less-engaged ones. If we want to make statements about our entire customer base, we need to reduce the impact of this over-represented group on the results. This is where weighted analysis comes into play.

## The idea behind weighted analysis

In a nutshell, **weighted survey analysis amplifies the impact of survey respondents that are over-represented in your sample and reduces the impact of survey respondents that are under-represented**.

The idea is to **assign each respondent a weight** that influences their impact on the statistic you calculate. Respondents belonging to an over-represented group will get a lower weight, which lowers their impact on the results. The reverse will be true for under-represented groups.

## Choosing adjustment variables for weighting

How do we determine whether a group in the survey sample is over- or under-represented? We need to define this with regard to specific **adjustment variables** that we can also use later for computing the weights. Choose variables that you expect will be relevant for the analysis. For example: If you're surveying users of a bike-sharing service, an appropriate adjustment variable can be the frequency of using said service. A less important variable might be the payment method that people are using.

For all the adjustment variables, **you'll need to know the frequency distributions in both your sample and in your target population**. Only then can you compare them, examine any devations, and compute the weights accordingly.

I've come across these two ways of obtaining the **population frequencies**:
* When surveying your own users and your target population is the entire user base, you can often get the frequency distributions from your **customer database**. For example: If you want to use age as an adjustment variable (and know the birth dates of all your users), you can simply pull the frequencies of different age groups from your customer table—or ask a friendly Data Analyst to do so.
* When your target population is the general population of a country (e.g., citizens of Switzerland), you can use **census data**, which usually includes basic socio-demographics.

Obtaining the **sample frequencies** sounds simple, but can also be a challenge. Here are the two main options:
* **Using self-reported data**: You can assess an adjustment variables with a question in your survey. For example, you can ask people directly which age group they belong to. Make sure to have a plan in place for those who prefer not to answer the question (e.g., you could set their response to NA and impute the missing values). 
* **Using objective data**: You might also be able to capture objective data along with the survey responses. For example, when surveying a customer base, you can use a personalized survey invitation link that allows you to pass along certain customer attributes, or even the customer's ID. When taking this approach, make sure to consider the ethical and legal requirements because you risk de-anonymizing the survey responses and the customer needs to opt in to this type of data processing (at least under GPDR).

Once you know the frequency distributions of your adjustment variables in the population and in the sample, you can use them to compute weights for your survey respondents. 

## Choosing an appropriate weighting algorithm

I'm far from an expert on weighting algorithms and there seem to be many different approaches with different levels of complexity. [This report by Pew Research](https://www.pewresearch.org/methods/2018/01/26/for-weighting-online-opt-in-samples-what-matters-most/) gives a nice overview. Here are some notable quotes:

> “When it comes to accuracy, **choosing the right variables for weighting is more important** than choosing the right statistical method.”
> 
> “The **most** **basic weighting method (raking) performs nearly as well** as more elaborate techniques based on matching.”

There seems to be a pragmatic conclusion here: Going with a basic "raking" algorithm for weighting and spending more time on selecting appropriate adjustment variables. What's a raking algorithm? On a high level, the raking procedure iteratively adjusts the weight for each respondent until the distributions of all the adjustment variables align well enough between the sample and the population.

## Computing survey weights in R

My suggested implementation for survey weighting in R makes use of the **[`anesrake`](https://cran.r-project.org/web/packages/anesrake/anesrake.pdf)** package. I kept the following steps deliberately simple. Your project might require additional data preparation or a more sophisticated weighting approach.

### Step 1: Load required packages

Let’s start by loading the required packages. These two are all we need for now:

```r
library(tidyverse)
library(anesrake)
```

### Step 2: Check for missing data

The anesrake algorithm can’t work with missing data in the adjustment variables. You'll need to decide on a way to prevent or deal with missing values (e.g., imputation). Some options are outlined in this [article by freeCodeCamp](https://www.freecodecamp.org/news/how-to-handle-missing-data-in-a-dataset/).

You can start by counting the missing values for each variable and go from there:

```r
map_df(survey_data, ~sum(is.na(.x)))
```

### Step 3: Transform your survey data to work with anesrake

The anesrake algorithm wants our dataset to be a [base data frame](https://rdrr.io/r/base/data.frame.html) and all adjustment variables to be [factors](https://r4ds.had.co.nz/factors.html). You can handle these transformations like this:

```r
survey_data <- as.data.frame(survey_data)

survey_data <- survey_data %>% 
  mutate(across(c(weighting_var_1, weighting_var2),
                   as.factor))
```

### Step 4: Add an ID variable

Your survey dataset should contain an ID variable that allows you to uniquely identify responses and later match the computed weights to them. Perhaps your dataset already includes an ID variable, otherwise you can simply create one using row numbers as follows.

```r
survey_data <- survey_data %>% 
  mutate(id = 1:nrow(survey_data))
```

### Step 5: Enter the population frequencies

We need to tell anesrake the adjustment variables' frequency distributions in the target population. These have to be provided as a named list of named vectors following the format below.

```r
targets <- list(
  age_group = c("18-24" = 0.31,
                "25-34" = 0.34,
                "35-44" = 0.18,
                "45-55" = 0.11,
                "above 55" = 0.05),
  subscription_status = c("none" = 0.15,
                          "standard" = 0.62,
                          "premium" = 0.23)
)
```

### Step 6: Run the raking algorithm

We’re ready to run the actual raking algorithm by calling `anesrake`.

```r
raking_result <- anesrake(inputter = targets,
                          dataframe = survey_data,
                          caseid = survey_data$id)
```

Once anesrake is done, you can obtain the weights like this.

```r
weights <- tibble(id = names(raking_result$weightvec),
                  weight = raking_result$weightvec)
```

It’s also worth exploring the anesrake list object a bit further (here: “raking_result”). For example, the list item “varsused” will tell you which of your specified adjustment variables have actually been used for weighting. Your adjustment variables might not have been used if their sample distributions didn’t differ much from the population distribution. By default, anesrake only includes adjustment variables when there is a discrepancy of more than 5%. You can change this default by setting the “pctlim” argument to your desired value.

### Step 7: Add the weights

Let’s add the weights we just calculated to the survey dataframe and join by ID.

```r
survey_data <- survey_data %>% 
  mutate(id = as.character(id)) %>%
  left_join(weights, by = "id")
```

Note that the ID variable in the “weights” data frame is in character format because it was derived from the `names` attribute of `raking_results$weightvec`. We need to make sure that the ID columns in the survey dataframe and the weight dataframe have the same format in order for the joining operation to work.

## Conducting weighted analyses in R 

We have now computed weights for each survey respondents and are ready to compute **weighted statistics**. There are dedicated functions available for this, which often don't differ much from their non-weighted counterparts, except that they need you to specify a column containing weights.

The following functions may come in handy.

- **[`stats::weighted.mean()`](https://rdrr.io/r/stats/weighted.mean.html)** — for calculating a weighted mean.
- **[`weights::wpct()`](https://rdrr.io/cran/weights/man/wpct.html)** — for calculating a weighted frequency table.
- **[`weights::wtd.cors()`](https://rdrr.io/cran/weights/man/wtd.cors.html)** – for calculating weighted correlations. If you want standard errors and a test of significance as well, use weights::wtd.cor() instead.
- **[`Hmisc::wtd.var()`](https://rdrr.io/cran/Hmisc/man/wtd.stats.html)** – for calculating a weighted variance.
- **[`Hmisc::wtd.quantile()`](https://rdrr.io/cran/Hmisc/man/wtd.stats.html)** – for calculating weighted quantiles.

Note that some of these functions will work without specifying a weight variable, which means you won’t see an error if you forget to include it.

## Conclusion

Survey weighting can lead to more accurate results when working with a biased sample, although it's not as powerful as one might think. I have yet to encounter a project where the weighted analysis leads to completely different results and takeaways than the non-weighted analysis. The differences often seem rather subtle to me, and this was also one of the findings in the [Pew Research report](https://www.pewresearch.org/methods/2018/01/26/for-weighting-online-opt-in-samples-what-matters-most/): 

> “Even the most effective adjustment procedures were **unable to remove most of the bias**.”

However, I don't think there's any disadvantage in working through a weighting approach. In any case, it forces you to consider more ways in which your sample might be biased – and might inspire taking additional measures to address these biases.

---

**References**

- [Caroline Jarrett (2021) – Surveys That Work](https://rosenfeldmedia.com/books/surveys-that-work/)
- [Pew Research Center (2018) – For Weighting Online Opt-In Samples, What Matters Most?](https://www.pewresearch.org/methods/2018/01/26/for-weighting-online-opt-in-samples-what-matters-most/)
- [R Bloggers (2018) – Survey Raking: An Illustration](https://www.r-bloggers.com/2018/12/survey-raking-an-illustration/)