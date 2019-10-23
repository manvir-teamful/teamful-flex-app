import React from 'react';
import { FormattedMessage, FormattedHTMLMessage, FormattedDate } from '../../util/reactIntl';
import moment from 'moment';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types';
import { daysBetween, dateFromAPIToLocalNoon } from '../../util/dates';

import css from './BookingBreakdown.css';

const BookingPeriod = props => {
  let { isSingleDay, startDate, endDate, startTime } = props;
  const dateFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  };
  if(typeof startTime === "undefined" || !startTime){
    startTime = "";
  }

  if (isSingleDay) {
    return (
      <span className={css.nowrap}>
        <FormattedDate value={startDate} {...dateFormatOptions} />
        {startTime}
      </span>
    );
  }

  return (
    <FormattedMessage
      id="BookingBreakdown.bookingPeriod"
      values={{
        bookingStart: (
          <span className={css.nowrap}>
            <FormattedDate value={startDate} {...dateFormatOptions} />
          </span>
        ),
        bookingEnd: (
          <span className={css.nowrap}>
            <FormattedDate value={endDate} {...dateFormatOptions} />
          </span>
        ),
      }}
    />
  );
};

const LineItemBookingPeriod = props => {
  /* eslint-disable no-unused-vars */
  const { transaction, booking, bookingData, unitType } = props;

  // Attributes: displayStart and displayEnd can be used to differentiate shown time range
  // from actual start and end times used for availability reservation. It can help in situations
  // where there are preparation time needed between bookings.
  // Read more: https://www.sharetribe.com/api-reference/#bookings
  const { start, end, displayStart, displayEnd } = booking.attributes;
  const localStartDate = dateFromAPIToLocalNoon(displayStart || start);
  const localEndDateRaw = dateFromAPIToLocalNoon(displayEnd || end);

  let startTime = bookingData && typeof bookingData.startTime !== "undefined" ? bookingData.startTime : "";
  if(!startTime && transaction.attributes
     && typeof transaction.attributes.protectedData  !== "undefined" && !!transaction.attributes.protectedData
     && typeof transaction.attributes.protectedData.startTime  !== "undefined"
     && !!transaction.attributes.protectedData.startTime)
  {
    startTime = ",   " + transaction.attributes.protectedData.startTime;
  }

  const isNightly = unitType === LINE_ITEM_NIGHT;
  /* eslint-disable no-unused-vars */
  const isDaily = unitType === LINE_ITEM_DAY;

  const dayCount = daysBetween(localStartDate, localEndDateRaw);
  const isSingleDay = !isNightly && dayCount === 1;
  const endDay = isNightly ? localEndDateRaw : moment(localEndDateRaw).subtract(1, 'days');
  /* eslint-disable no-unused-vars */
  const unitPurchase = transaction.attributes.lineItems.find(
    item => item.code === unitType && !item.reversal
  );

  //const useQuantityForDayCount = isNightly || isDaily;
  //const count = useQuantityForDayCount && unitPurchase ? unitPurchase.quantity.toFixed() : dayCount;
  const count = 1;

  const unitCountMessage = (
    <FormattedHTMLMessage
      id={isNightly ? 'BookingBreakdown.nightCount' : 'BookingBreakdown.dayCount'}
      values={{ count }}
    />
  );

  return (
    <div className={css.lineItem}>
      <span className={css.itemLabel}>
        <BookingPeriod isSingleDay={isSingleDay} startDate={localStartDate} endDate={endDay}
                       startTime={startTime}/>
      </span>
      <span className={css.itemValue}>{unitCountMessage}</span>
    </div>
  );
};

LineItemBookingPeriod.propTypes = {
  transaction: propTypes.transaction.isRequired,
  booking: propTypes.booking.isRequired,
};

export default LineItemBookingPeriod;
