import React from 'react';
import { FormattedMessage, intlShape } from '../../util/reactIntl';
import { formatMoney } from '../../util/currency';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types';

import css from './BookingBreakdown.css';

const LineItemPersonsMaybe = props => {
  const { transaction, unitType, intl } = props;

  const quantityEnsured = transaction.quantity ? transaction.quantity : "1";

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
