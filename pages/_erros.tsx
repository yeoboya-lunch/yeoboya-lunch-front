import {Component} from 'react';

class Error extends Component<{statusCode: any}> {
  static getInitialProps: ({res, err}: {res: any; err: any}) => {statusCode: any};
  render() {
    let {statusCode: statusCode} = this.props;
    return <p>{statusCode ? `${statusCode} 서버 오류` : '클라이언트 오류'}</p>;
  }
}

Error.getInitialProps = ({res, err}) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return {statusCode};
};

export default Error;
