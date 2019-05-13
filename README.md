# College Costs API

## The Gist

API server that can be used to determine the cost of attending a university. Implemented with [Koa](https://koajs.com/).

## Example Usage

```
/colleges/Harvard%20University/cost => 43217
```

## Usage

Run the following commands to setup and start the server:

```bash
yarn
yarn build
yarn start
```

## Inputs

- `college_name`: Param that comes after `/colleges/` segement in URI that specifies which college to get the cost of
  - Needs to match a colleges name exactly (case-sensitive).
  - **NOTE:** Make sure to properly escape spaces in the college name
- `room_and_board`: Query param used to specify that the cost of room and board should be included in the returned cost sum
  - Set this query param to the string `1` to use this feature (i.e. `.../cost?room_and_board=1`)

## Usage Notes

- The returned cost assumes the student to be paying in state tuition

## Modifying College Data

To modify college data, use `build/college-data.csv`. Then run `yarn build` to use the new data.

## Developer Scripts

- `yarn build`: Build necessary files for app to function
- `yarn start`: Start the app
- `yarn test`: Runs unit and integration tests
- `yarn test-watch`: Runs tests in Jest's watch mode

## Implementation Caveats

- The implementation currently relies upon loading all college data into memory. This was done to simplify the process, and not rely on DB configuration (i.e. the user installing and configuring a DB on their machine). If college data becomes large enough where this becomes a problem, the implementation could change to be more robust.
