import { Injectable } from '@angular/core';
import { ICompany } from '../interface/company.interface';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../../utils/service/base.service';
import { ENVIRONMENT } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CompanyService extends BaseService<ICompany> {
  constructor(http: HttpClient) {
    super(`${ENVIRONMENT.apiUrl}/company`, http);
  }
}
