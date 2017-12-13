import dispatcher from "../Dispatcher";

export function searchBanks(search, page) {
  dispatcher.dispatch({
    type: "SEARCH_BANKS",
    search,
    page,
  });
}

export function fetchCarsharingCosts(bankIds, bankingUserIds, bankingPINs) {
  dispatcher.dispatch({
    type: "FETCH_CARSHARING_COSTS",
    bankIds,
    bankingUserIds,
    bankingPINs,
  });
}
