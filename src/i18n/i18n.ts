import { Translate } from 'react-declarative';
import { locale } from './locale/locale';
import { t } from './locale/t';

Translate.install(locale, t);
