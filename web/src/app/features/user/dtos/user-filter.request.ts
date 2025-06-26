import {BaseFilterRequest} from '../../../shared/dtos/base-filter.request';

export interface UserFilterRequest extends BaseFilterRequest {
  userId?: string;
  userName?: string;
  userEmail?: string;
}
