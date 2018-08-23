import { Component, OnInit } from '@angular/core';
import { ACLService } from '@delon/acl';
import { MenuService } from '@delon/theme';

@Component({
  selector: 'security-right',
  templateUrl: './security-right.component.html',
})
export class SecurityRightComponent implements OnInit {
  constructor(public aclSrv: ACLService, private menuSrv: MenuService) {

  }


  ngOnInit() {
  }

  addRoleByrule_manager() {
    this.aclSrv.attachRole(['rule_manager']);
    this.reMenu();
  }

  addRoleByuser_manager() {
    this.aclSrv.attachRole(['user_manager']);
    this.reMenu();
  }

  remomeRoleByrule_manager() {
    this.aclSrv.removeRole(['rule_manager']);
    this.reMenu();
  }

  remomeRoleByuser_manager() {
    this.aclSrv.removeRole(['user_manager']);
    this.reMenu();
  }

  setAdmin() {
    this.aclSrv.setFull(true);
    this.reMenu();
  }

  removeAdmin() {
    this.aclSrv.setFull(false);
    this.reMenu();
  }

  private reMenu() {
    this.menuSrv.resume();
  }
}
