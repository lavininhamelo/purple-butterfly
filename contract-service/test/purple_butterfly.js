const PurpleButterfly = artifacts.require("PurpleButterfly");
const PurpleButterflyToken = artifacts.require("PurpleButterflyToken");

contract("PurpleButterfly", function (accounts) {
  describe("PurpleButterfly", function () {
    let owner = accounts[0];
    let pbf;
    let pbftk;

    beforeEach(async () => {
      pbftk = await PurpleButterflyToken.deployed();
      pbf = await PurpleButterfly.deployed();
      await pbf.setTokenAddress(pbftk.address);
    });

    it("should init the contract correctly", async function () {
      const tokenAddress = await pbf.getTokenAddress();
      assert(tokenAddress === pbftk.address);
    });

    it("should set the contract address role", async function () {
      const contractAddress = await pbf.address;
      await pbftk.setNftContractAddress(contractAddress);
      const defaultAdminRole = await pbftk.DEFAULT_ADMIN_ROLE();
      const hasRole = await pbftk.hasRole(defaultAdminRole, contractAddress);
      assert(hasRole === true);
    });

    it("should have enough tokens", async function () {
      const balanceOf = await pbftk.balanceOf.call(owner);
      const totalBalance = web3.utils.fromWei(balanceOf.toString(), "ether");
      assert.equal(totalBalance, "1000");
    });

    it("should mint a new post", async function () {
      const tokenId = "1234";
      const privateKey = "6a73e8a78317789919f7c5b4cf46a04a73497445441efd609379e5e5eac10518";
      const signature = await web3.eth.accounts.sign(tokenId, privateKey);
      await pbf.mintPost("test", signature.signature, tokenId);
      const post = await pbf.posts(tokenId);
      const balanceOf = await pbftk.balanceOf.call(owner);
      const totalBalance = web3.utils.fromWei(balanceOf.toString(), "ether");
      assert(post.content === "test");
      assert(post.author === owner);
      assert((await pbf.ownerOf(tokenId)) === owner);
      assert(totalBalance === "999");
    });

    it("should not mint with invalid signature", async function () {
      const tokenId = "1234";
      const privateKey = "6a73e8a78317789919f7c5b4cf46a04a73497445441efd609379e5e5eac10518";
      const signature = await web3.eth.accounts.sign(tokenId, privateKey);
      const invalidSignature = signature.signature.slice(1);
      try {
        await pbf.mintPost("test", invalidSignature, tokenId);
        assert(false);
      } catch (error) {
        assert(error);
      }
    });

    it("should throw an error when the token was already minted", async function () {
      const tokenId = "1234";
      const privateKey = "6a73e8a78317789919f7c5b4cf46a04a73497445441efd609379e5e5eac10518";
      const signature = await web3.eth.accounts.sign(tokenId, privateKey);

      try {
        await pbf.mintPost("test", signature.signature, tokenId);
        await pbf.mintPost("test", signature.signature, tokenId);
        assert(false === true);
      } catch (error) {
        assert(error);
      }
    });

    it("should mint a new comment", async function () {
      const parentId = "123123";
      const tokenId = "1234678";
      const privateKey = "6a73e8a78317789919f7c5b4cf46a04a73497445441efd609379e5e5eac10518";
      const signature = await web3.eth.accounts.sign(parentId, privateKey);
      
      await pbf.mintPost("test", signature.signature, parentId);
      await pbf.mintComment("test", signature.signature, tokenId, parentId);
      const post = await pbf.posts(tokenId);
      const balanceOf = await pbftk.balanceOf.call(owner);
      const totalBalance = web3.utils.fromWei(balanceOf.toString(), "ether");
     
      assert(post.content === "test");
      assert(post.author === owner);
      assert(post.parent.toString() === parentId);
      assert((await pbf.ownerOf(tokenId)) === owner);
      assert(totalBalance === "997");
    });

    it("should like a post", async function () {
      const addr2 = accounts[1];
      await pbftk.transfer(addr2, web3.utils.toWei("10", "ether"));
      const tokenId = "12346789";
      const privateKey = "6a73e8a78317789919f7c5b4cf46a04a73497445441efd609379e5e5eac10518";
      const signature = await web3.eth.accounts.sign(tokenId, privateKey);
     

      await pbf.mintPost("test", signature.signature, tokenId);
      await pbf.likePost(tokenId, { from: addr2 });
      const post = await pbf.likes(tokenId);
      const ownerBalance = (await pbftk.balanceOf.call(owner)).toString();
      const addr2Balance = (await pbftk.balanceOf.call(addr2)).toString();
      
      assert(post.toString() === "1");
      assert(web3.utils.fromWei(ownerBalance, "ether") === "987");
      assert(web3.utils.fromWei(addr2Balance, "ether") === "9");
    });
  });
});
