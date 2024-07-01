from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from downloader import YouTubeDownloader 


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

@app.post('/download/video/{download_link:path}')
async def handle_download(download_link, v = None):
    actual_link = f'{download_link}?v={v}'
    ytdl = YouTubeDownloader(actual_link, 'video')
    ytdl.download()
    return ytdl.get_info()



@app.post('/download/playlist/{download_link}')
async def handle_download(download_link):
    print(download_link)
