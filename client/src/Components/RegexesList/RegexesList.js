import { List } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

function RegexesList(props) {

  return (
    <List
      bordered
      dataSource={props.regexes}
      renderItem={regex => (
        <List.Item>
          {regex.regex}
        </List.Item>
      )}
    />
  );
}

RegexesList.propTypes = {
  regexes: PropTypes.arrayOf(PropTypes.shape({
    regex: PropTypes.string.isRequired
  })).isRequired
};

export default RegexesList;