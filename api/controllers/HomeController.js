var publicKey = "BDw6MSUkf-IHWX5idF4ciBCWKhaWLtXgnWRMIYo41I17KaKNQBPEzzNm3UzXazCEnkIX9dsg1BnPsHUduFTuAKI";
var privateKey = "zTf34wFd-f3ZAfedaozE46CKZNhsmXT51rDfoNvjPuw";
module.exports = {
	register: function (req, res) {
		var key = req.param('key');
		console.log(key);
		return res.json({key: key});
	}
};