import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ukLocale from 'date-fns/locale/uk';

const Time = ({date}) => formatDistanceToNow(date, { addSuffix: true , locale: ukLocale})

export default Time;
