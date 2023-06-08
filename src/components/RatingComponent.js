import {Rating} from "@mui/material";
import {styled} from "@mui/system";

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#56B280',
    },
    '& .MuiRating-iconHover': {
        color: 'rgba(86,178,128,0.7)',
    },
});

const RatingComponent = ({ value, onChange }) => {
    return (
        <StyledRating
            name="rating"
            value={value}
            onChange={(event, newValue) => onChange(newValue)}
        />
    );
};
export default RatingComponent