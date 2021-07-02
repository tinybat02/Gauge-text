import React, { PureComponent } from 'react';
import { PanelProps } from '@grafana/data';
import { PanelOptions, Frame } from 'types';
import { processData } from './util/helpFuc';
import { CircularProgressbar } from 'react-circular-progressbar';
import CompanyIcon from './img/Ariadnemaps.png';
import HostIcon from './img/werk1.png';
import 'react-circular-progressbar/dist/styles.css';
import './css/main.css';

interface Props extends PanelProps<PanelOptions> {}
interface State {
  num: number;
}

export class MainPanel extends PureComponent<Props, State> {
  state: State = {
    num: 0,
  };

  componentDidMount() {
    const series = this.props.data.series as Frame[];
    if (series.length == 0 || series[0].fields[0].values.buffer.length == 0) {
      return;
    }

    const buffer = series[0].fields[0].values.buffer;
    const num = processData(buffer);
    this.setState({ num });
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.data.series !== this.props.data.series) {
      const series = this.props.data.series as Frame[];
      if (series.length == 0 || series[0].fields[0].values.buffer.length == 0) {
        this.setState({ num: 0 });
        return;
      }

      const buffer = series[0].fields[0].values.buffer;
      const num = processData(buffer);
      this.setState({ num });
    }
  }

  render() {
    const {
      width,
      height,
      options: { threshold, text },
    } = this.props;
    const { num } = this.state;

    return (
      <div
        style={{
          width,
          height,
          padding: 10,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <CircularProgressbar value={num >= threshold ? 100 : (num / threshold) * 100} text={num.toString()} />
        <div style={{ marginTop: 15, fontFamily: 'Trebuchet MS', fontSize: '3em', textAlign: 'center' }}>{text}</div>
        <img src={HostIcon} style={{ width: 100, position: 'absolute', top: 0, right: 0 }} />
        <img src={CompanyIcon} style={{ width: 100, height: 40, position: 'absolute', bottom: 0, right: 0 }} />
      </div>
    );
  }
}
