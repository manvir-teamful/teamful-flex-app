import React from 'react';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
// eslint-disable-next-line
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types';

import css from './BookingBreakdown.css';

const LineItemPersonsMaybe = props => {
  // eslint-disable-next-line
  const { transaction, bookingData, intl } = props;

  const quantityEnsured = bookingData.quantity ? bookingData.quantity : "1";

  return (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>
        <FormattedMessage id={"LineItemPersonsMaybe.numberOfPersons"} />
      </span>
      <span className={css.itemValue}>{quantityEnsured}</span>
    </div>
  );
};

LineItemPersonsMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
  unitType: propTypes.bookingUnitType.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemPersonsMaybe;
