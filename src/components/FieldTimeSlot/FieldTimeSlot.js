import React from 'react';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { FieldSelect } from '../../components';
const moment = require('moment');

const FieldTimeSlot = props => {
  const { placeholder, intl, ...rest } = props;
  const momentZero = moment.utc(0);
  const timeLabels = [];

  for(let i = 0; i < 49; i++){
    timeLabels.push(momentZero.format("HH:mm"));
    momentZero.add(30, "minutes");
  }

  const selectProps = {
    ...rest,
  };

  return (
    <FieldSelect {...selectProps}>
      {timeLabels.map( timeVal => {
        return <option value={timeVal}>{timeVal}</option>
      })}
    </FieldSelect>
  );
};

FieldTimeSlot.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(FieldTimeSlot);
