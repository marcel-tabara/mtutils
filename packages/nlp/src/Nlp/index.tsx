import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import padSequences from './utils/paddedSeq';
import { TextField, Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const Nlp = () => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
  const classes = useStyles();

  const url = {
    model:
      'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json',
    metadata:
      'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json',
  };

  const OOV_INDEX = 2;

  const [metadata, setMetadata] = useState();
  const [model, setModel] = useState();
  const [testText, setText] = useState('');
  const [testScore, setScore] = useState('');
  const [trimedText, setTrim] = useState('');
  const [seqText, setSeq] = useState('');
  const [padText, setPad] = useState('');
  const [inputText, setInput] = useState('');

  async function loadModel(url) {
    try {
      const model = await tf.loadLayersModel(url.model);
      setModel(model);
    } catch (err) {
      console.log(err);
    }
  }

  async function loadMetadata(url) {
    try {
      const metadataJson = await fetch(url.metadata);
      const metadata = await metadataJson.json();
      setMetadata(metadata);
    } catch (err) {
      console.log(err);
    }
  }

  const getSentimentScore = (text) => {
    console.log(text);
    const inputText = text
      .trim()
      .toLowerCase()
      .replace(/(\.|\,|\!)/g, '')
      .split(' ');
    setTrim(inputText);
    console.log(inputText);
    const sequence = inputText.map((word) => {
      let wordIndex = metadata.word_index[word] + metadata.index_from;
      if (wordIndex > metadata.vocabulary_size) {
        wordIndex = OOV_INDEX;
      }
      return wordIndex;
    });
    setSeq(sequence);
    console.log(sequence);
    // Perform truncation and padding.
    const paddedSequence = padSequences([sequence], metadata.max_len);
    console.log(metadata?.max_len ?? 0);
    setPad(paddedSequence);

    const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);
    console.log(input);
    setInput(input);
    const predictOut = model?.predict(input) ?? '';
    const score = predictOut.dataSync()[0];
    predictOut.dispose();
    setScore(score);
    return score;
  };

  useEffect(() => {
    tf.ready().then(() => {
      loadModel(url);
      loadMetadata(url);
    });
  }, []);

  return (
    <>
      <Grid
        container
        style={{
          height: '90vh',
          padding: 20,
        }}
      >
        <Grid
          item
          lg={12}
          xs={12}
          style={{
            display: 'flex',
            alignItems: 'left',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <TextField
            id="standard-read-only-input"
            label="Type your sentences here"
            onChange={(e) => setText(e.target.value)}
            value={testText}
            multiline
            rows={20}
            variant="outlined"
            style={{ width: '100%' }}
          />
          <br />
          <br />
          {testText !== '' ? (
            <Button
              style={{ width: '20vh', height: '5vh' }}
              variant="outlined"
              onClick={() => getSentimentScore(testText)}
            >
              Calculate
            </Button>
          ) : (
            <></>
          )}
        </Grid>
        <Grid
          item
          lg={12}
          xs={12}
          style={{
            display: 'flex',
            alignItems: 'left',
            flexDirection: 'column',
          }}
        >
          {testScore !== '' && (
            <>
              <h1 style={{ color: 'blue' }}>{testScore}</h1>

              <h2>1 = Positive, 0 = Negative</h2>

              <h3>Trimmed the input text:</h3>

              <Typography> {trimedText.toString()}</Typography>

              <h3>Map vocab to words: </h3>

              <Typography> {seqText.toString()}</Typography>

              <h3>Fix the length:</h3>

              <Typography>{padText.toString()}</Typography>

              <h3>Input to tf:</h3>

              <Typography>{inputText.toString()}</Typography>

              <a href={url.model}>Model Link</a>
              <a href={url.metadata}>Model Metadata</a>
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export { Nlp };
