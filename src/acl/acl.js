import Vue from "vue"
import { AclInstaller, AclCreate, AclRule } from "vue-acl"
import router from "@/router"

Vue.use(AclInstaller)

var getRoles = function(){
  var res1 = ["user"];

  if(sessionStorage.roles){
  var res2 =  JSON.parse(sessionStorage.roles).userRoles.map(x=> x.code);

  return res2;
  }
  return res1;

}

export default new AclCreate({
  initial: getRoles(),
  //notfound: "/pages/not-authorized",
  notfound: "/pages/login",
  router,
  acceptLocalRules: false,
  globalRules: {
    admin: new AclRule("admin").or('ThebigBoss').generate(),
    editor: new AclRule("editor").or('admin').or('ThebigBoss').generate(),
    //user: new AclRule("user").generate(),
    user: new AclRule('user').or('admin').or("editor").or('ThebigBoss').generate(),
    basic: new AclRule("basic").or('admin').or("editor").or('ThebigBoss').or("user").generate(),
    TheBoss: new AclRule("TheBoss").or('ThebigBoss').generate(),
    ThebigBoss: new AclRule("ThebigBoss").generate(),
    userM: new AclRule("userM").or('admin').or("editor").or("user").or('ThebigBoss').generate(), //User Limited functions
    basicM: new AclRule("basicM").or('admin').or("editor").or("user").or('ThebigBoss').generate(), //Basic with manual entries
    manager: new AclRule("manager").or('admin').or("editor").or("user").or('ThebigBoss').generate(),
    userL: new AclRule("userL").or('admin').or("editor").or("user").or('ThebigBoss').generate(), //User without manual entries
    fams: new AclRule("Fams").generate(),
    fams24: new AclRule("Fams24").generate(),

    famsBasic: new AclRule("Fams").and("basic").or("Fams").and("basicM").or("Fams").and("userM").or("Fams").and("user").or("Fams").and("userL").or("Fams").and("manager").or("Fams").and("admin").generate(),
    fams24Basic: new AclRule("Fams24").and("basic").or("Fams24").and("basicM").or("Fams24").and("userM").or("Fams24").and("user").or("Fams24").and("userL").or("Fams24").and("manager").or("Fams24").and("admin").generate(),
    famsAllBasic: new AclRule("basic").or("basicM").or("userM").or("user").or("userL").or("manager").or("admin").or("TheBoss").or("ThebigBoss").generate(),

    famsBasicM: new AclRule("basicM").or("userM").or("user").or("userL").or("admin").or("manager").or("TheBoss").or("ThebigBoss").generate(), //FAMS Basic with manual entries

    fams24User: new AclRule("Fams24").and("user").or("admin").and("Fams24").or("Fams24").and("userL").or("manager").and("Fams").generate(),
    famsUser: new AclRule("Fams").and("user").or("admin").and("Fams").or("Fams").and("userL").or("manager").and("Fams24").generate(),
    allFamsUser: new AclRule("user").or("admin").or("userL").or("manager").generate(),

    famsUserM: new AclRule("Fams24").and("user").or("Fams").and("userM").or("Fams").and("userL").or("manager").and("Fams").or("Fams").and("admin").generate(), //FAMS User without manual entries
    fams24UserM: new AclRule("Fams").and("user").or("Fams24").and("userM").or("Fams24").and("userL").or("manager").and("Fams24").or("Fams24").and("admin").generate(), //FAMS24 User without manual entries
    allFamsUserM: new AclRule("user").or("userM").or("userL").or("manager").or("admin").generate(), //FAMS24 User without manual entries

    famsManager: new AclRule("Fams").and("userL").or("Fams").and("admin").or("manager").and("Fams").generate(),
    fams24Manager: new AclRule("Fams24").and("userL").or("Fams24").and("admin").or("manager").and("Fams24").generate(),
    allFamsManager: new AclRule("userL").or("admin").or("manager").generate(),

    famsUserL: new AclRule("Fams").and("userL").or("Fams").and("admin").generate(), //FAMS User Limited functions
    fams24UserL: new AclRule("Fams24").and("userL").or("Fams24").and("admin").generate(), //FAMS User Limited functions
    allFamsUserL: new AclRule("userL").or("admin").generate(), //FAMS User Limited functions

    quickReportViewers: new AclRule("user").or("admin").or("userL").or("userM").or("TheBoss").or("ThebigBoss").generate(),
    quickReportViewersWithBasic: new AclRule("basic").or("basicM").or("userM").or("user").or("userL").or("admin").or("TheBoss").or("ThebigBoss").generate(),
    atg: new AclRule("ATG").or("basic").or("basicM").or("userM").or("user").or("userL").or("admin").or("TheBoss").or("ThebigBoss").generate(),

    everybody: new AclRule("admin").or("editor").or("user").or("manager").or("basic").or("TheBoss").or("ThebigBoss").or("userM").or("basicM").or("userL").or("fams").or("fams24").or("fams24User").or("famsUser").or("famsBasicM").or("famsUserM").or("famsUserL").or("ATG"),
  }
})

/*
Fams Roles according to Bryan

1: FAMS Basic
Only has access to Quick reports

2: FAMS Basic with manual entries
Same as FAMS Basic user but has access to add manual entries

3: FAMS User
No manual entries
No management
Can only see quick reports and custom reports

4: FAMS User without manual entries
Same as the FAMS User but has access to add manual entries
No management
Can only see quick reports and custom reports

5: FAMS Manager without data editing
Can view quick reports, custom reports and Fams manager and add but no editing
Also no Manual Entries

6: FAMS User Limited functions
Same ass the FAMS User but has access to FAMS manager
No manual entries
Can only see quick reports and custom reports

7: FAMS Admin
Full access to portal except adminTools

8. FAMS ATG
Access to ATG Data
*/
