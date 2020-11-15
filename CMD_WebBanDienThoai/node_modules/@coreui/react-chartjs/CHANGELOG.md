### [@coreui/react-chartjs](https://coreui.io/) changelog

##### `1.0.0-alpha.4`
BREAKING CHANGE:
- `<CCharts>` component has been deprecated and will be removed in v1.0.0
- use `<CChart type="...">` instead   
or one of following types:   
  `<CChartBar>`  
  `<CChartHorizontalBar>`  
  `<CChartLine>`  
  `<CChartDoughnut>`  
  `<CChartRadar>`  
  `<CChartPie>`  
  `<CChartPolarArea>`  

sample import:
```jsx
import {
  CChart,
  CChartBar,
  CChartHorizontalBar,
  CChartLine,
  CChartDoughnut,
  CChartRadar,
  CChartPie,
  CChartPolarArea
} from '@coreui/react-chartjs';
```


##### `1.0.0-alpha.0`
- initial version

install:
```bash
npm install @coreui/react
npm install @coreui/react-chartjs 
```

