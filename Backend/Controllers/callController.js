export const initiateCall = (req, res) => {
    // Logic for initiating a video call
    res.status(200).json({ message: 'Call initiated' });
};

export const endCall = (req, res) => {
    // Logic for ending a video call
    res.status(200).json({ message: 'Call ended' });
};
