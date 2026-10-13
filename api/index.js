const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// Manifest đăng ký Addon với Nuvio / Stremio
const manifest = {
  id: "com.yanhh3d.vercel.addon",
  version: "1.0.0",
  name: "YanHH3D Auto Streamer",
  description: "Addon cào stream YanHH3D chạy trên Vercel Serverless",
  resources: ["stream"],
  types: ["movie", "series"],
  idPrefixes: ["tt", "yan3d_"]
};

app.get('/manifest.json', (req, res) => {
  res.json(manifest);
});

// Xử lý request khi bấm xem phim trên Nuvio
app.get('/stream/:type/:id.json', async (req, res) => {
  try {
    // Link stream m3u8 kèm Referer chuẩn
    const streamUrl = "https://scontent-sin2-9-xx.streamrpt.xyz/hls/playlist.m3u8";

    return res.json({
      streams: [
        {
          name: "YanHH3D Vercel",
          title: "Server Stream - Full HD 1080p",
          url: streamUrl,
          behaviorHints: {
            notSupported: false,
            requestHeaders: {
              "Referer": "https://yanhh3d.chat/",
              "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36"
            }
          }
        }
      ]
    });
  } catch (error) {
    console.error("Lỗi:", error.message);
    return res.json({ streams: [] });
  }
});

module.exports = app;
