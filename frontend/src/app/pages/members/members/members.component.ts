/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/interfaces/common/smart-table';

import { NbToastrService } from '@nebular/theme';

import { UserData, User } from '../../../@core/interfaces/common/users';


@Component({
  selector: 'ngx-smart-table',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {


  useMe: any[];


  settings2 = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      login: {
        title: 'Login',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      },
    },
  };


  source2: LocalDataSource = new LocalDataSource();


  constructor(private toasterService: NbToastrService, private usersService: UserData,
    private service: SmartTableData) {
    // const data = this.service.getData();
    // console.log(data);

    // this.source.load(data);
  }

  ngOnInit(): void {
    this.loadUsers();
  }


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }


  loadUsers() {

    this.usersService.getAllUsers().subscribe((result: any[]) => {
      this.useMe = result;
     this.source2.load(Object.values(this.useMe));

      console.log(this.useMe);
      console.log(this.source2);
    },
      err => {
        this.handleWrongResponse();
      });

  }


  handleWrongResponse() {
    this.toasterService.danger('', `ERRRRRRRRORRRRRRRR`);
  }



}
