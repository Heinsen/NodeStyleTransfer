FROM node:argon

RUN apt-get update && apt-get install -y \ 
	libtool \
	pkg-config \
	build-essential \
	autoconf \
	automake \
	libzmq-dev \
&& rm -rf /var/lib/apt/lists/*

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app
RUN mkdir -p /usr/src/app/public/images/results

EXPOSE 3000

CMD [ "npm", "start" ]