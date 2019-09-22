import React from 'react';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { FieldSelect } from '../../components';
import classNames from 'classnames';
import css from './FieldTimeSlot.css';
const moment = require('moment');

const FieldTimeSlot = props => {
  const { placeholder, intl, useMobileMargins, ...rest } = props;
  const momentZero = moment.utc(0);
  const timeLabels = [];

  for(let i = 0; i < 49; i++){
    timeLabels.push(momentZero.format("HH:mm"));
    momentZero.add(30, "minutes");
  }

  const selectProps = {
    ...rest,
  };

  const selectClasses = classNames({ [css.mobileMargins]: useMobileMargins });

  return (
    <div className={selectClasses}>
      <FieldSelect {...selectProps}>
        {timeLabels.map( (timeVal, optIndex) => {
          return <option key={optIndex} value={timeVal}>{timeVal}</option>
        })}
      </FieldSelect>
    </div>
  );
};

FieldTimeSlot.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(FieldTimeSlot);
