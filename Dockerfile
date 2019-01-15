FROM gcr.io/kaniko-project/executor:latest
COPY yaml-files/config.json /kaniko/.docker/
COPY yaml-files/credentials /root/.aws/