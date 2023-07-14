FROM python:3.10.1-slim as builder

# copy project
COPY ./backend/src /app
WORKDIR  /app

# Update system environment
ENV PYTHON_VERSION=3.10
ENV DEBIAN_FRONTEND noninteractive
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8


# Install Python deps
RUN python3 -m venv /opt/venv && \
    /opt/venv/bin/python -m pip install pip --upgrade && \
    /opt/venv/bin/python -m pip install -r /app/requirements.txt

RUN chmod +x config/entrypoint.sh

# WORKDIR /app/src
# Make local files executable
# EXPOSE 80

CMD [ "config/entrypoint.sh" ]