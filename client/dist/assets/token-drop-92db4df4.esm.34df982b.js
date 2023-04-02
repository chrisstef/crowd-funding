import{am as m,C as f,_ as t,b as o,a as C,an as W,c as w,d as v,k as y,G as T,h as b,f as A,l as R,m as E,a4 as F,o as S,A as D,T as h}from"./index.a1d1c7b8.js";class c extends m{constructor(a,n,s){var r;let d=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},p=arguments.length>4?arguments[4]:void 0,l=arguments.length>5?arguments[5]:void 0,g=arguments.length>6&&arguments[6]!==void 0?arguments[6]:new f(a,n,p,d);super(g,s,l),r=this,t(this,"abi",void 0),t(this,"metadata",void 0),t(this,"app",void 0),t(this,"roles",void 0),t(this,"encoder",void 0),t(this,"estimator",void 0),t(this,"sales",void 0),t(this,"platformFees",void 0),t(this,"events",void 0),t(this,"claimConditions",void 0),t(this,"interceptor",void 0),t(this,"claim",o(async function(e){let i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return r.claimTo.prepare(await r.contractWrapper.getSignerAddress(),e,i)})),t(this,"claimTo",o(async function(e,i){let u=arguments.length>2&&arguments[2]!==void 0?arguments[2]:!0;return r.erc20.claimTo.prepare(e,i,{checkERC20Allowance:u})})),t(this,"delegateTo",o(async e=>h.fromContractWrapper({contractWrapper:this.contractWrapper,method:"delegate",args:[e]}))),t(this,"burnTokens",o(async e=>this.erc20.burn.prepare(e))),t(this,"burnFrom",o(async(e,i)=>this.erc20.burnFrom.prepare(e,i))),this.abi=p,this.metadata=new C(this.contractWrapper,W,this.storage),this.app=new w(this.contractWrapper,this.metadata,this.storage),this.roles=new v(this.contractWrapper,c.contractRoles),this.encoder=new y(this.contractWrapper),this.estimator=new T(this.contractWrapper),this.events=new b(this.contractWrapper),this.sales=new A(this.contractWrapper),this.platformFees=new R(this.contractWrapper),this.interceptor=new E(this.contractWrapper),this.claimConditions=new F(this.contractWrapper,this.metadata,this.storage)}async getVoteBalance(){return await this.getVoteBalanceOf(await this.contractWrapper.getSignerAddress())}async getVoteBalanceOf(a){return await this.erc20.getValue(await this.contractWrapper.readContract.getVotes(a))}async getDelegation(){return await this.getDelegationOf(await this.contractWrapper.getSignerAddress())}async getDelegationOf(a){return await this.contractWrapper.readContract.delegates(a)}async isTransferRestricted(){return!await this.contractWrapper.readContract.hasRole(S("transfer"),D)}async prepare(a,n,s){return h.fromContractWrapper({contractWrapper:this.contractWrapper,method:a,args:n,overrides:s})}async call(a){for(var n=arguments.length,s=new Array(n>1?n-1:0),r=1;r<n;r++)s[r-1]=arguments[r];return this.contractWrapper.call(a,...s)}}t(c,"contractRoles",["admin","transfer"]);export{c as TokenDrop};
