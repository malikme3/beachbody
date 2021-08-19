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


**Project Requirements**
Design a REST API endpoint that suggests a "workout class" given a target time of day for a chain of 3 gyms around Los Angeles with an existing schedule of classes every 2 hours from 9am-5pm, throughout the day (M-F).
--------------------------------
* The endpoint is exposed at /suggestion
* The requested date and time is passed in as a query parameter 'date'
* The caller's location can optionally be supplied via querystring parameters 'latitude' and 'longitude' to help improve relative scores
* The endpoint returns a JSON response with an array of scored suggested matches
    * The suggestions are sorted by descending score
    * Each suggestion should be on or before the time provided by caller and not after classes start
    * Each suggestion should prefer a closer location if times are the same and user location is provided
    * Each suggestion has a score between 0 and 1 (inclusive) indicating confidence in the suggestion (1 is most confident)
    * Each suggestion has a latitude and longitude
Gym information and classes
----------------------------------------------
Gym 1 at location (33.9540723,-118.3636729)
Classes M-F - 9am, 11am, 1pm, 3pm
Gym 2 at location (34.002827,-118.331835)
Classes M-F - 10am, 12pm, 2pm, 4pm
Gym 3 at location (33.9988632,-118.3498971)
Classes M-F - 11am, 1pm, 3pm
Rules
--------------------------------
* Please use Java or whatever language / tech stack you want. If you decide to use something other than Java, let us know, but also feel free to use what you're most comfortable with. The goal is not to validate your knowledge of a technology. You don't have to use a database, although feel free to, if you want.
* Try to consider this as you would a production quality project to help us see how you write clean, maintainable code. Build something you would be okay with shipping to a user and building onto over time.
* Please write some unit tests and documentation for any key functionality you want to highlight or clarify its use (and for later maintainability).