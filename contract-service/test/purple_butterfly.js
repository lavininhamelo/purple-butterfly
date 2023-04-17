const PurpleButterfly = artifacts.require("PurpleButterfly");
const PurpleButterflyToken = artifacts.require("PurpleButterflyToken");

contract("PurpleButterfly", function (accounts) {
  describe("PurpleButterfly", function () {
    let owner = accounts[0];
    let pbf;
    let pbftk;

    const getBalance = async (address) => {
      const balance = await pbftk.balanceOf.call(address);
      return parseInt(web3.utils.fromWei(balance.toString(), "ether"));
    };

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
      const totalBalance = await getBalance(owner);
      assert.equal(totalBalance, 1000);
    });

    it("should mint a new post", async function () {
      const tokenId = "1234";
      const privateKey = "6a73e8a78317789919f7c5b4cf46a04a73497445441efd609379e5e5eac10518";
      const signature = await web3.eth.accounts.sign(tokenId, privateKey);
      const oldBalance = await getBalance(owner);

      await pbf.mintPost("test", signature.signature, tokenId);
      const post = await pbf.posts(tokenId);
      const totalBalance = await getBalance(owner);

      assert(post.content === "test");
      assert(post.author === owner);
      assert((await pbf.ownerOf(tokenId)) === owner);
      assert(totalBalance === oldBalance - 1);
    });

    it("should not mint with invalid signature", async function () {
      const tokenId = "5678";
      const privateKey = "6a73e8a78317789919f7c5b4cf46a04a73497445441efd609379e5e5eac10518";
      const signature = await web3.eth.accounts.sign(tokenId, privateKey);
      const invalidSignature = signature.signature.slice(0, signature.signature.length - 1) + "a";

      try {
        await pbf.mintPost("test", invalidSignature, tokenId);
        assert(false);
      } catch (error) {
        assert(error.message.includes("invalid signature"));
      }
    });

    it("should throw an error when the token was already minted", async function () {
      const tokenId = "90125";
      const privateKey = "6a73e8a78317789919f7c5b4cf46a04a73497445441efd609379e5e5eac10518";
      const signature = await web3.eth.accounts.sign(tokenId, privateKey);

      await pbf.mintPost("test", signature.signature, tokenId);

      try {
        await pbf.mintPost("test", signature.signature, tokenId);
        assert(false);
      } catch (error) {
        assert(error.message.includes("error-token-already-exists"));
      }
    });

    it("should mint a new comment", async function () {
      const parentId = "999";
      const tokenId = "888";
      const privateKey = "6a73e8a78317789919f7c5b4cf46a04a73497445441efd609379e5e5eac10518";
      const signature = await web3.eth.accounts.sign(parentId, privateKey);
      const signatureCommnet = await web3.eth.accounts.sign(tokenId, privateKey);
      const oldBalance = await getBalance(owner);

      await pbf.mintPost("test", signature.signature, parentId);
      await pbf.mintComment("test", signatureCommnet.signature, tokenId, parentId);
      const post = await pbf.posts(tokenId);
      const postOwner = await pbf.ownerOf(tokenId);
      const totalBalance = await getBalance(owner);

      assert(post.content === "test");
      assert(post.author === owner);
      assert(post.parent.toString() === parentId);
      assert(postOwner === owner);
      assert(totalBalance === oldBalance - 2);
    });

    it("should like a post", async function () {
      const addr2 = accounts[1];
      await pbftk.transfer(addr2, web3.utils.toWei("10", "ether"));

      const tokenId = "777";
      const privateKey = "6a73e8a78317789919f7c5b4cf46a04a73497445441efd609379e5e5eac10518";
      const signature = await web3.eth.accounts.sign(tokenId, privateKey);
      const oldBalanceOwner = await getBalance(owner);
      const oldBalanceAddr2 = await getBalance(addr2);

      await pbf.mintPost("test", signature.signature, tokenId, { from: owner });
      await pbf.likePost(tokenId, { from: addr2 });

      const postLike = await pbf.likes(tokenId);
      const ownerBalance = await getBalance(owner);
      const addr2Balance = await getBalance(addr2);

      assert(postLike.toString() === "1");
      assert(addr2Balance === oldBalanceAddr2 - 1);
      assert(ownerBalance === oldBalanceOwner);
    });
  });
});
