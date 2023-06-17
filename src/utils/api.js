//Common API Caller
export async function CommonAPICaller(
  urls,
  keywords,
  loadingStates,
  loadingStateSetter,
  dataState,
  dataStateSetter
) {
  const requests = urls.map((url) => fetch(url));

  //Changing the loader states to showcase the loader once the API call is made
  changeLoaderState(true, keywords, loadingStates, loadingStateSetter);
  const responses = await Promise.all(requests);
  const json = responses.map((response) => response.json());
  const data = await Promise.all(json);

  //Changing the loader states to false , post API Resolution
  changeDataState(data, keywords, dataState, dataStateSetter);
  changeLoaderState(false, keywords, loadingStates, loadingStateSetter);
}

const changeLoaderState = (
  booleanValue,
  keywords,
  loadingStates,
  loadingStateSetter
) => {
  let tempStateObj = {};
  keywords.forEach((key) => {
    tempStateObj[key] = booleanValue;
  });
  loadingStateSetter({ ...loadingStates, ...tempStateObj });
};

const changeDataState = (data, keywords, dataState, dataStateSetter) => {
  let tempStateObj = {};
  keywords.forEach((key, i) => {
    tempStateObj[key] = data[i];
  });
  dataStateSetter({ ...dataState, ...tempStateObj });
};
