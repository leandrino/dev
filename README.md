# Development React inside Docker

This repository is exclusive to study how to develop react applications in docker.

## Starting a project

- Change the default command in your `docker-compose.yml` to `command: sh -c "tail -f /dev/null"`;
- Build your container `docker-compose build`;
- Run your docker compose file `docker-compose up`;
- Execute your container `docker exec -it blog-leandrino /bin/bash`;
- In container shell install your application (`react` or `nextjs`).

or

- Build your container `docker build . -f Dockerfile -t base-nodejs`;
- Run your container `docker container run -it base-nodejs /bin/bash`;
- Execute your container `docker exec -it blog-leandrino /bin/bash`;
- In container shell install your application (`react` or `nextjs`).

## Working in your project

### Starting development mode

- Change the default command in your `docker-compose.yml` to `command: sh -c "yarn install && CHOKIDAR_USEPOLLING=true yarn dev"`;
- Done, you running development mode with hot-reloading.

### Install a dependency

- Execute your container `docker exec -it blog-leandrino /bin/bash`;
- install your dependency like `yarn add dayjs`;
- Done, you can close container bash.

## Local Development

- Access your `root` project folder;
- In your local shell run `sudo chown -R ${USER} application`;
- open yout VSCode `code .`;
- Done.

## Reference

- [Will Schenk article "Developing React inside docker"](https://willschenk.com/articles/2020/developing_react_inside_docker/)