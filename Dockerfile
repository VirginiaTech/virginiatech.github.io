FROM ruby:2.3

EXPOSE 4000
WORKDIR /src

RUN apt-get update && \
    apt-get install -y nodejs && \
    rm -rf /var/lib/apt/lists/*

COPY Gemfile* /src/
RUN bundle install

CMD jekyll serve --host 0.0.0.0