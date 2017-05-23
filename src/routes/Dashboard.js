import React from 'react';
import { connect } from 'dva';

import FileTable from '../components/fileTable'

const Dashboard = props => (
  <div>
    <FileTable {...props} />
  </div>
)

const mapStateToProps = ({ dashboard, loading }) => {
  const { filelist, selectedRowKeys, selectedRows } = dashboard
  return {
    loading: loading.models.dashboard,
    filelist,
    selectedRowKeys,
    selectedRows,
  }
}

export default connect(mapStateToProps)(Dashboard);
