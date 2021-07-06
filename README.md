## setup

git clone https://github.com/malikme3/beachbody.git
cd beachbody
git checkout develop
yarn // install dependencies

## offline test

sls offline

## testing function locally

npm run invoke local -f <function name> -p <request event path>

## testing function in AWS

npm run invoke -f <function name> -p <request event path>

## unit testing

npm run test

## deployment

sls deploy

###### project structure

requests-events/
tests/

> > controllers/
> > services/
> > units/

src/

> > hanlders/
> > controllers/
> > services/
> > domain/
> > orm/
> > units/
