import wineData from './api.json';
const App = () => {

  //To calculate the class-wise mean, median, mode of “Flavanoids” for the entire dataset.

  const flavanoidsData = (totalData: any[], alcoholNum: number) => {
    const filterData = totalData.filter((item: { Alcohol: number; }) => item.Alcohol === alcoholNum);
    const fladData = filterData.map(item => parseFloat(item.Flavanoids));

    // Calculate mean
    const mean = fladData.reduce((sum, value) => sum + value, 0) / fladData.length;

    // Calculate median
    fladData.sort((a: any, b: any) => a.Flavanoids - b.Flavanoids);
    const middle = Math.floor(fladData.length / 2);
    const median = fladData.length % 2 === 0 ? (fladData[middle - 1] + fladData[middle]) / 2 : fladData[middle];
    // Calculate mode
    const counts: any = {};
    let mode = null;
    let maxCount = 0;

    fladData.forEach((value: any | number) => {
      counts[value] = (counts[value] || 0) + 1;
      if (counts[value] > maxCount) {
        mode = value;
        maxCount = counts[value];
      }
    });
    return { mean, median, mode };
  };
  const flavanoids1: any = flavanoidsData(wineData.Items, 1);
  const flavanoids2: any = flavanoidsData(wineData.Items, 2);
  const flavanoids3: any = flavanoidsData(wineData.Items, 3);

  //create a new property “Gamma” for each point of the dataset. “Gamma” can be calculated as Gamma = (Ash * Hue) / Magnesium.  Thereafter, calculate the class-wise mean, median, mode of “Gamma” for the entire dataset

  const gammaData = (p_gammaData: any[], p_gNum: number) => {
    const filterData = p_gammaData.filter((item: { Alcohol: number; }) => item.Alcohol === p_gNum);
    filterData.map((eachItem: any) => {
      let Gamma: number
      Gamma = (parseFloat(eachItem.Ash) * eachItem.Hue) / eachItem.Magnesium
      eachItem["Gamma"] = Gamma
    })
    const gammaFlad = filterData.map(item => item.Gamma);

    // Calculate mean
    const mean = gammaFlad.reduce((sum, value) => sum + value, 0) / gammaFlad.length;

    // Calculate median
    gammaFlad.sort((a: any, b: any) => a.Gamma - b.Gamma);
    const middle = Math.floor(filterData.length / 2);
    const median =
      gammaFlad.length % 2 === 0 ? (gammaFlad[middle - 1] + gammaFlad[middle]) / 2
        : gammaFlad[middle];

    // Calculate mode
    const counts: any = {};
    let mode = null;
    let maxCount = 0;
    gammaFlad.forEach((value: string | number) => {
      counts[value] = (counts[value] || 0) + 1;
      if (counts[value] > maxCount) {
        mode = value;
        maxCount = counts[value];
      }
    });
    return { mean, median, mode };
  };
  const gammaStats1: any = gammaData(wineData.Items, 1);
  const gammaStats2: any = gammaData(wineData.Items, 2);
  const gammaStats3: any = gammaData(wineData.Items, 3);

  return (
    <div className='body'>
      <h2>Data Visualization Task</h2>
      <caption>Flavanoids Data</caption>
      <table className="table" >
        <thead>
          <tr>
            <th>Measure</th>
            <th>Class 1</th>
            <th>Class 2</th>
            <th>Class 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Flavanoids Mean</td>
            <td>{flavanoids1.mean.toFixed(3)}</td>
            <td>{flavanoids2.mean.toFixed(3)}</td>
            <td>{flavanoids3.mean.toFixed(3)}</td>
          </tr>
          <tr>
            <td>Flavanoids Median</td>
            <td>{flavanoids1.median.toFixed(3)}</td>
            <td>{flavanoids2.median.toFixed(3)}</td>
            <td>{flavanoids3.median.toFixed(3)}</td>
          </tr>
          <tr>
            <td>Flavanoids Mode</td>
            <td>{flavanoids1.mode.toFixed(3)}</td>
            <td>{flavanoids2.mode.toFixed(3)}</td>
            <td>{flavanoids3.mode.toFixed(3)}</td>
          </tr>

        </tbody>
      </table>
      <>            <caption>Gamma Data</caption>
        <table className="table" >
          <thead>
            <tr>
              <th>Measure</th>
              <th>Class 1</th>
              <th>Class 2</th>
              <th>Class 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gamma Mean</td>
              <td>{gammaStats1.mean.toFixed(3)}</td>
              <td>{gammaStats2.mean.toFixed(3)}</td>
              <td>{gammaStats3.mean.toFixed(3)}</td>
            </tr>
            <tr>
              <td>Gamma Median</td>
              <td>{gammaStats1.median.toFixed(3)}</td>
              <td>{gammaStats2.median.toFixed(3)}</td>
              <td>{gammaStats3.median.toFixed(3)}</td>
            </tr>
            <tr>
              <td>Gamma Mode</td>
              <td>{gammaStats1.mode.toFixed(3)}</td>
              <td>{gammaStats2.mode.toFixed(3)}</td>
              <td>{gammaStats3.mode.toFixed(3)}</td>
            </tr>

          </tbody>
        </table>
      </>
    </div>
  )
}

export default App;
