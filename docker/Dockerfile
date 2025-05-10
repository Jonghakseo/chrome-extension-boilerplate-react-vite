FROM node:23.11.0

USER root:1000

WORKDIR /app

RUN apt update \
    && apt install -y --no-install-recommends git vim less \
    && npm install --global web-ext pnpm \
    && rm -rf /var/lib/apt/lists/*

COPY --chmod=555 docker/entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh"]
