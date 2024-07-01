from fastapi import FastAPI

app = FastAPI()


@app.get('/')
def sendData():
    return 'Hello World'
