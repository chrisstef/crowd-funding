import{C as w,_ as n,a as m,M as f,c as y,d as W,k as A,G as C,r as L,s as v,h as S,l as T,m as B,A as p,L as u,t as o,B as d,o as h,u as k,v as l,w as b,N as E,x as N,T as F}from"./index.a1d1c7b8.js";class g{get chainId(){return this._chainId}constructor(e,t,r){let a=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},s=arguments.length>4?arguments[4]:void 0,c=arguments.length>5?arguments[5]:void 0,i=arguments.length>6&&arguments[6]!==void 0?arguments[6]:new w(e,t,s,a);n(this,"abi",void 0),n(this,"contractWrapper",void 0),n(this,"storage",void 0),n(this,"encoder",void 0),n(this,"events",void 0),n(this,"estimator",void 0),n(this,"platformFees",void 0),n(this,"metadata",void 0),n(this,"app",void 0),n(this,"roles",void 0),n(this,"interceptor",void 0),n(this,"direct",void 0),n(this,"auction",void 0),n(this,"_chainId",void 0),n(this,"getAll",this.getAllListings),this._chainId=c,this.abi=s,this.contractWrapper=i,this.storage=r,this.metadata=new m(this.contractWrapper,f,this.storage),this.app=new y(this.contractWrapper,this.metadata,this.storage),this.roles=new W(this.contractWrapper,g.contractRoles),this.encoder=new A(this.contractWrapper),this.estimator=new C(this.contractWrapper),this.direct=new L(this.contractWrapper,this.storage),this.auction=new v(this.contractWrapper,this.storage),this.events=new S(this.contractWrapper),this.platformFees=new T(this.contractWrapper),this.interceptor=new B(this.contractWrapper)}onNetworkUpdated(e){this.contractWrapper.updateSignerOrProvider(e)}getAddress(){return this.contractWrapper.readContract.address}async getListing(e){const t=await this.contractWrapper.readContract.listings(e);if(t.assetContract===p)throw new u(this.getAddress(),e.toString());switch(t.listingType){case o.Auction:return await this.auction.mapListing(t);case o.Direct:return await this.direct.mapListing(t);default:throw new Error(`Unknown listing type: ${t.listingType}`)}}async getActiveListings(e){const t=await this.getAllListingsNoFilter(!0),r=this.applyFilter(t,e),a=d.from(Math.floor(Date.now()/1e3));return r.filter(s=>s.type===o.Auction&&d.from(s.endTimeInEpochSeconds).gt(a)&&d.from(s.startTimeInEpochSeconds).lte(a)||s.type===o.Direct&&s.quantity>0)}async getAllListings(e){const t=await this.getAllListingsNoFilter(!1);return this.applyFilter(t,e)}async getTotalCount(){return await this.contractWrapper.readContract.totalListings()}async isRestrictedToListerRoleOnly(){return!await this.contractWrapper.readContract.hasRole(h("lister"),p)}async getBidBufferBps(){return this.contractWrapper.readContract.bidBufferBps()}async getTimeBufferInSeconds(){return this.contractWrapper.readContract.timeBuffer()}async getOffers(e){const t=await this.events.getEvents("NewOffer",{order:"desc",filters:{listingId:e}});return await Promise.all(t.map(async r=>await k(this.contractWrapper.getProvider(),d.from(e),{quantityWanted:r.data.quantityWanted,pricePerToken:r.data.quantityWanted.gt(0)?r.data.totalOfferAmount.div(r.data.quantityWanted):r.data.totalOfferAmount,currency:r.data.currency,offeror:r.data.offeror})))}async buyoutListing(e,t,r){const a=await this.contractWrapper.readContract.listings(e);if(a.listingId.toString()!==e.toString())throw new u(this.getAddress(),e.toString());switch(a.listingType){case o.Direct:return l(t!==void 0,"quantityDesired is required when buying out a direct listing"),await this.direct.buyoutListing(e,t,r);case o.Auction:return await this.auction.buyoutListing(e);default:throw Error(`Unknown listing type: ${a.listingType}`)}}async makeOffer(e,t,r){const a=await this.contractWrapper.readContract.listings(e);if(a.listingId.toString()!==e.toString())throw new u(this.getAddress(),e.toString());const s=await this.contractWrapper.getChainID();switch(a.listingType){case o.Direct:return l(r,"quantity is required when making an offer on a direct listing"),await this.direct.makeOffer(e,r,b(a.currency)?E[s].wrapped.address:a.currency,t);case o.Auction:return await this.auction.makeBid(e,t);default:throw Error(`Unknown listing type: ${a.listingType}`)}}async setBidBufferBps(e){await this.roles.verify(["admin"],await this.contractWrapper.getSignerAddress());const t=await this.getTimeBufferInSeconds();await this.contractWrapper.sendTransaction("setAuctionBuffers",[t,d.from(e)])}async setTimeBufferInSeconds(e){await this.roles.verify(["admin"],await this.contractWrapper.getSignerAddress());const t=await this.getBidBufferBps();await this.contractWrapper.sendTransaction("setAuctionBuffers",[d.from(e),t])}async allowListingFromSpecificAssetOnly(e){const t=[];(await this.roles.get("asset")).includes(p)&&t.push(this.encoder.encode("revokeRole",[h("asset"),p])),t.push(this.encoder.encode("grantRole",[h("asset"),e])),await this.contractWrapper.multiCall(t)}async allowListingFromAnyAsset(){const e=[],t=await this.roles.get("asset");for(const r in t)e.push(this.encoder.encode("revokeRole",[h("asset"),r]));e.push(this.encoder.encode("grantRole",[h("asset"),p])),await this.contractWrapper.multiCall(e)}async getAllListingsNoFilter(e){return(await Promise.all(Array.from(Array((await this.contractWrapper.readContract.totalListings()).toNumber()).keys()).map(async r=>{let a;try{a=await this.getListing(r)}catch(s){if(s instanceof u)return;console.warn(`Failed to get listing ${r}' - skipping. Try 'marketplace.getListing(${r})' to get the underlying error.`);return}if(a.type===o.Auction)return a;if(e){const{valid:s}=await this.direct.isStillValidListing(a);if(!s)return}return a}))).filter(r=>r!==void 0)}applyFilter(e,t){let r=[...e];const a=d.from((t==null?void 0:t.start)||0).toNumber(),s=d.from((t==null?void 0:t.count)||N).toNumber();return t&&(t.seller&&(r=r.filter(c=>{var i;return c.sellerAddress.toString().toLowerCase()===((i=t==null?void 0:t.seller)==null?void 0:i.toString().toLowerCase())})),t.tokenContract&&(r=r.filter(c=>{var i;return c.assetContractAddress.toString().toLowerCase()===((i=t==null?void 0:t.tokenContract)==null?void 0:i.toString().toLowerCase())})),t.tokenId!==void 0&&(r=r.filter(c=>{var i;return c.tokenId.toString()===((i=t==null?void 0:t.tokenId)==null?void 0:i.toString())})),r=r.filter((c,i)=>i>=a),r=r.slice(0,s)),r}async prepare(e,t,r){return F.fromContractWrapper({contractWrapper:this.contractWrapper,method:e,args:t,overrides:r})}async call(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),a=1;a<t;a++)r[a-1]=arguments[a];return this.contractWrapper.call(e,...r)}}n(g,"contractRoles",["admin","lister","asset"]);export{g as Marketplace};
