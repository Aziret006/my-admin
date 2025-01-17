import { configureStore } from "@reduxjs/toolkit";
import user from "./slice/user.slice";
import fields from "./slice/fields-slice";
import armor from "./slice/armor";
import story from "./slice/story";
import createFoobol from "./slice/create-foobol-slice";
import reserveSlice from "./slice/reserve-slice";
import arbitratorSlice from "./slice/arbitrators";
import ubdateFields from "./slice/ubdate-fields";
import walletReducer from "./slice/wallet-slice";
import analitOrdersFieldsReducer from "./slice/analit-orders-fields";
import totalIncomeReducer from "./slice/total-income";
import numberOfNewClientsReducer from "./slice/number-of-new-clients";
import sortingReducer from "./slice/sorting-slice";
import ratingReducer from "./slice/ratingSlice";
import walletBalanceReducer from "./slice/balans-slice";
import searchSlice from "./slice/search-slice";
const store = configureStore({
  reducer: {
    user,
    fields,
    armor,
    story,
    reserveSlice,
    createFoobol,
    arbitratorSlice,
    ubdateFields,
    wallet: walletReducer,
    analitOrdersFields: analitOrdersFieldsReducer,
    totalIncome: totalIncomeReducer,
    numberOfNewClients: numberOfNewClientsReducer,
    sorting: sortingReducer,
    rating: ratingReducer,
    walletBalance: walletBalanceReducer,
    searchSlice,
  },
});

export default store;
