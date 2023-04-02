import{C as h,_ as c,a as l,ar as u,c as g,k as m,G as v,h as W,m as w,B as C,as as p,at as d,W as y,aj as f,ak as V,al as T,V as A,T as b}from"./index.a1d1c7b8.js";class x{get chainId(){return this._chainId}constructor(t,a,r){let e=arguments.length>3&&arguments[3]!==void 0?arguments[3]:{},o=arguments.length>4?arguments[4]:void 0,n=arguments.length>5?arguments[5]:void 0,s=arguments.length>6&&arguments[6]!==void 0?arguments[6]:new h(t,a,o,e);c(this,"contractWrapper",void 0),c(this,"storage",void 0),c(this,"abi",void 0),c(this,"metadata",void 0),c(this,"app",void 0),c(this,"encoder",void 0),c(this,"estimator",void 0),c(this,"events",void 0),c(this,"interceptor",void 0),c(this,"_chainId",void 0),this._chainId=n,this.abi=o,this.contractWrapper=s,this.storage=r,this.metadata=new l(this.contractWrapper,u,this.storage),this.app=new g(this.contractWrapper,this.metadata,this.storage),this.encoder=new m(this.contractWrapper),this.estimator=new v(this.contractWrapper),this.events=new W(this.contractWrapper),this.interceptor=new w(this.contractWrapper)}onNetworkUpdated(t){this.contractWrapper.updateSignerOrProvider(t)}getAddress(){return this.contractWrapper.readContract.address}async get(t){const r=(await this.getAll()).filter(e=>e.proposalId.eq(C.from(t)));if(r.length===0)throw new Error("proposal not found");return r[0]}async getAll(){return Promise.all((await this.contractWrapper.readContract.getAllProposals()).map(async t=>({proposalId:t.proposalId,proposer:t.proposer,description:t.description,startBlock:t.startBlock,endBlock:t.endBlock,state:await this.contractWrapper.readContract.state(t.proposalId),votes:await this.getProposalVotes(t.proposalId),executions:t[3].map((a,r)=>({toAddress:t.targets[r],nativeTokenValue:a,transactionData:t.calldatas[r]}))})))}async getProposalVotes(t){const a=await this.contractWrapper.readContract.proposalVotes(t);return[{type:p.Against,label:"Against",count:a.againstVotes},{type:p.For,label:"For",count:a.forVotes},{type:p.Abstain,label:"Abstain",count:a.abstainVotes}]}async hasVoted(t,a){return a||(a=await this.contractWrapper.getSignerAddress()),this.contractWrapper.readContract.hasVoted(t,a)}async canExecute(t){await this.ensureExists(t);const a=await this.get(t),r=a.executions.map(s=>s.toAddress),e=a.executions.map(s=>s.nativeTokenValue),o=a.executions.map(s=>s.transactionData),n=d(a.description);try{return await this.contractWrapper.callStatic().execute(r,e,o,n),!0}catch{return!1}}async balance(){const t=await this.contractWrapper.readContract.provider.getBalance(this.contractWrapper.readContract.address);return{name:"",symbol:"",decimals:18,value:t,displayValue:y(t,18)}}async balanceOfToken(t){const a=new f(t,V,this.contractWrapper.getProvider());return await T(this.contractWrapper.getProvider(),t,await a.balanceOf(this.contractWrapper.readContract.address))}async ensureExists(t){try{await this.contractWrapper.readContract.state(t)}catch{throw Error(`Proposal ${t} not found`)}}async settings(){const[t,a,r,e,o]=await Promise.all([this.contractWrapper.readContract.votingDelay(),this.contractWrapper.readContract.votingPeriod(),this.contractWrapper.readContract.token(),this.contractWrapper.readContract["quorumNumerator()"](),this.contractWrapper.readContract.proposalThreshold()]),n=await A(this.contractWrapper.getProvider(),r);return{votingDelay:t.toString(),votingPeriod:a.toString(),votingTokenAddress:r,votingTokenMetadata:n,votingQuorumFraction:e.toString(),proposalTokenThreshold:o.toString()}}async propose(t,a){a||(a=[{toAddress:this.contractWrapper.readContract.address,nativeTokenValue:0,transactionData:"0x"}]);const r=a.map(i=>i.toAddress),e=a.map(i=>i.nativeTokenValue),o=a.map(i=>i.transactionData),n=await this.contractWrapper.sendTransaction("propose",[r,e,o,t]);return{id:this.contractWrapper.parseLogs("ProposalCreated",n==null?void 0:n.logs)[0].args.proposalId,receipt:n}}async vote(t,a){let r=arguments.length>2&&arguments[2]!==void 0?arguments[2]:"";return await this.ensureExists(t),{receipt:await this.contractWrapper.sendTransaction("castVoteWithReason",[t,a,r])}}async execute(t){await this.ensureExists(t);const a=await this.get(t),r=a.executions.map(s=>s.toAddress),e=a.executions.map(s=>s.nativeTokenValue),o=a.executions.map(s=>s.transactionData),n=d(a.description);return{receipt:await this.contractWrapper.sendTransaction("execute",[r,e,o,n])}}async prepare(t,a,r){return b.fromContractWrapper({contractWrapper:this.contractWrapper,method:t,args:a,overrides:r})}async call(t){for(var a=arguments.length,r=new Array(a>1?a-1:0),e=1;e<a;e++)r[e-1]=arguments[e];return this.contractWrapper.call(t,...r)}}export{x as Vote};
