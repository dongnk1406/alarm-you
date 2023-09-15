import {all, AllEffect, call, ForkEffect, spawn} from 'redux-saga/effects';

function* rootSaga(): Generator<AllEffect<ForkEffect<void>>> {
  const sagas = [homeSaga, hotelSaga, restaurantSaga, authSaga, planSaga];

  yield all(
    sagas.map(saga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.error(e);
          }
        }
      }),
    ),
  );
}

export default rootSaga;
