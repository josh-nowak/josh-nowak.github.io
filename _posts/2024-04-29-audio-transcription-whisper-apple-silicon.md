---
title: "Transcribing speech locally with OpenAI's Whisper model"
date: 2024-04-29 16:00:00 +0100
categories: [Tutorials]
render_with_liquid: false
---

Cloud-based providers for speech transcription are easy to find, but sometimes you want to keep your data local. This is especially true for sensitive, internal, or proprietary audio data such as team meetings, user interviews, and event recordings.

This tutorial outlines how to transcribe speech from audio to text using OpenAI's Whisper model on Macs, particularly those with an Apple Silicon processor (M1/M2/M3/...). None of the mentioned tools in this post are my own; I'm just compiling the steps to make it simpler for a broader audience. This tutorial only assumes basic familiarity with the command line and GitHub.

## Clone the `whisper.cpp` repository
The [whisper.cpp](https://github.com/ggerganov/whisper.cpp) repository offers a fast C/C++ implementation of OpenAI's Whisper model. The best part: it makes full use of Apple Silicon and even runs on the GPU.

Using your terminal, run the following command to clone the repository to your hard drive:

```bash
git clone https://github.com/ggerganov/whisper.cpp.git
cd whisper.cpp
```

## Download the model
Make sure that you are in the `whisper.cpp` directory and run the following command to download a large version of the Whisper model:

```bash
bash ./models/download-ggml-model.sh large-v3-q5_0
```

Larger models provide better transcription results. The `q5_0` suffix in the example above indicates that it is a [quantized](https://huggingface.co/docs/optimum/concept_guides/quantization) version of the model that runs faster.

From the `whisper.cpp` directory, run the following command once to compile the model:

```bash
make
```

## Convert audio to WAV

For this implementation of the Whisper model, audio files have to be manually converted to WAV format with a 16kHZ sampling rate and a single channel (mono). The free command line tool [FFmpeg](https://ffmpeg.org/) is the easiest way to do this. 

Install ffmpeg using Homebrew if you don't have it already:
```bash
brew install ffmpeg
```

Convert any MP3 file to the required WAV format:
```bash
ffmpeg -i audio.mp3 -ac 1 -ar 16000 audio.wav
```

Make sure to change `audio.mp3` and `audio.wav` to the actual input and output file paths.

If you have an entire folder of audio files to convert, run the following command, assuming your original files are in MP3 format:
```bash
for f in *.mp3; do ffmpeg -i "$f" -ac 1 -ar 16000 "${f%.mp3}.wav"; done
```
If your original files are in a different format, change `.mp3` above to match the actual file extension.

## Transcribe away

Now that everything is set up, you can transcribe speech from audio files. Run the following command to transcribe a single audio file called `audio.wav` and save it to a file named `transcript.txt`:

```bash
./main -m models/ggml-large-v3-q5_0.bin -f ~/audio.wav -otxt -of transcript
```

Note that the transcript file name is given without a file extension. The `-otxt` flag specifies the output format, and the `-of` flag specifies the output file name.

Another essential flag is `-l`, which specifies the language. The default is English, which can be changed by specifying a language code (e.g., `-l de` for German). See more options by running `./main --help`.

If you want to include the timestamps in your export, you can build the text file in a different way:

```bash
./main -m models/ggml-large-v3-q5_0.bin -f ~/audio.wav -np > transcript.txt
```

This saves the default transcription output to a text file, but removes all the system output thanks to the `-np` flag ("no prints").


## Performance
On a 2020 MacBook Pro with an M1 chip, this converts audio to text at about half the speed of real-time. For example, a 3-minute audio file takes about 1.5 minutes to transcribe. With newer chips, this should be even faster.

You can also try [smaller models](https://github.com/ggerganov/whisper.cpp/blob/master/models/README.md) if you care about speed over accuracy.

## Quick reference
In short, this is all it takes to transcribe speech locally:

```bash
# Clone the whisper.cpp repo and navigate to it
git clone https://github.com/ggerganov/whisper.cpp.git
cd whisper.cpp

# Download and compile a Whisper model
# (e.g., the 5-bit quantized large-v3 model)
bash ./models/download-ggml-model.sh large-v3-q5_0
make

# Convert an audio file, assuming it is in the home directory
ffmpeg -i ~/audio.mp3 -ac 1 -ar 16000 ~/audio.wav

# Transcribe the audio file and save the result to transcript.txt
./main -m models/ggml-large-v3-q5_0.bin -f ~/audio.wav -otxt -of transcript
```
