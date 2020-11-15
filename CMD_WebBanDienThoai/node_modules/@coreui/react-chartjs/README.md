### [@coreui/react-chartjs](https://coreui.io/) for [CoreUI for React](https://coreui.io/react/)

[![npm package][npm-badge]][npm]
[![NPM downloads][npm-download]][npm]

[npm-badge]: https://img.shields.io/npm/v/@coreui/react-chartjs/latest?style=flat-square
[npm]: https://www.npmjs.com/package/@coreui/react-chartjs
[npm-download]: https://img.shields.io/npm/dm/@coreui/react-chartjs.svg?style=flat-square

##### install:
```bash
npm install @coreui/react-chartjs 
```

##### import: 
```jsx
import { CChart } from '@coreui/react-chartjs';
```
or 
```js
import {
  CChart,
  CChartBar,
  CChartHorizontalBar,
  CChartLine,
  CChartDoughnut,
  CChartRadar,
  CChartPie,
  CChartPolarArea,
} from '@coreui/react-chartjs'
```

##### props:  
- `innerRef` object | func | string
- `datasets` array  
- `labels` array | string  
- `options` object  
- `plugins` array  
- `type` string: `bar` | `horizontalBar` | `line` | `doughnut` | `radar` | `pie` | `polarArea`

##### usage:
```jsx
...
class CoreUICharts extends Component {
...
render() {
    return (
      <CChart
        type="radar"
        datasets={[
          {
            label: '2019',
            backgroundColor: 'rgba(179,181,198,0.2)',
            borderColor: 'rgba(179,181,198,1)',
            pointBackgroundColor: 'rgba(179,181,198,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(179,181,198,1)',
            tooltipLabelColor: 'rgba(179,181,198,1)',
            data: [65, 59, 90, 81, 56, 55, 40]
          },
          {
            label: '2020',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            pointBackgroundColor: 'rgba(255,99,132,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,99,132,1)',
            tooltipLabelColor: 'rgba(255,99,132,1)',
            data: [28, 48, 40, 19, 96, 27, 100]
          }
        ]}
        options={{
          aspectRatio: 1.5,
          tooltips: {
            enabled: true
          }
        }}
        labels={[
          'Eating', 'Drinking', 'Sleeping', 'Designing',
          'Coding', 'Cycling', 'Running'
        ]}
      />
    )
}
...
```

---

- bootstrapped with [nwb](https://github.com/insin/nwb) toolkit

##### `npm run` scripts

`package.json` is configured with `"scripts"` we can use with `npm run` while developing the project.

Command | Description |
--- | ---
`npm start` | start a development server for the demo app
`npm test` | run tests
`npm run test:coverage` | run tests and produce a code coverage report in `coverage/`
`npm run test:watch` | start a test server and re-run tests on every change
`npm run build` | prepare for publishing to npm
`npm run clean` | delete built resources

#### see also:
- [Developing React Components and Libraries with nwb](https://github.com/insin/nwb/blob/master/docs/guides/ReactComponents.md#developing-react-components-and-libraries-with-nwb)
