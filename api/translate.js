module.exports = async function (req, res) {
  try {
    res.status(200).json({
      ok: true,
      message: "translate endpoint works"
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
