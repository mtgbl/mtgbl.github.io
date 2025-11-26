FROM ruby:3.2

WORKDIR /mtgbl

# install dependencies
COPY Gemfile .
COPY Gemfile.lock .
RUN bundle install

# copy website and serve it
COPY . .
CMD [ "bundle", "exec", "jekyll", "serve", "-H", "0.0.0.0", "-P", "4000" ]
