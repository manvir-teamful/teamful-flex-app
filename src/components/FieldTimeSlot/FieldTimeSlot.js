import React from 'react';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { FieldSelect } from '../../components';
import classNames from 'classnames';
import css from './FieldTimeSlot.css';
const moment = require('moment');

const FieldTimeSlot = props => {
  const { placeholder, intl, useMobileMargins, startTimestamp, endTimestamp, ...rest } = props;
  const momentZero = moment.utc(0);
  const timeLabels = [];
  let startTimeInd = startTimestamp ? Math.floor(startTimestamp / 1800) : 0;
  let endTimeInd = endTimestamp ? Math.floor(endTimestamp / 1800) : 48;

  if(startTimeInd >= 48){
    startTimeInd = 47;
  }
  if(startTimeInd < 0){
    startTimeInd = 0;
  }
  if(endTimeInd > 48){
    endTimeInd = 48;
  }
  if(endTimeInd < 1){
    endTimeInd = 1;
  }
  if(startTimeInd >= endTimeInd){
    endTimeInd = startTimeInd + 1;
  }

  for(let i = startTimeInd; i <= endTimeInd; i++){
    timeLabels.push(momentZero.format("hh:mm A"));
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
