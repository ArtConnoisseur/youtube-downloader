from pytube import YouTube, Playlist

class YouTubeDownloader:
    def __init__(self, link, type) -> None:
        self.link = link 

        types = {
            'video' : 1, 
            'playlist' : 2 
        }

        self.type = types['video']
        self.video_object = YouTube(link)
        
    def download(self):
            match self.type: 
                case 1: 
                    return self._download_video()
                case 2: 
                    return self._download_playlist() 
                case -1: 
                    return False 
                
    def _download_video(self): 
        download_stream = self.video_object.streams.filter(progressive=True)
        download_stream = download_stream[0]
        download_stream.download()
    
    def _download_playlist(self):
        print("Download Playlist")

    def get_info(self):
        return self._get_video_info()
    
    def _give_error(self): 
        return 'ERROR!'
    
    def _get_video_info(self):
        return {
            'title': self.video_object.title,
            'thumbnail': self.video_object.thumbnail_url, 
            'duration' : self.video_object.length, 
            'views': self.video_object.views
        }
    
    

def download(link):
    yt = YouTube(link)
    
    return yt

