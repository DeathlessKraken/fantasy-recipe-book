import { 
    RegExpMatcher, 
    englishDataset, 
    englishRecommendedTransformers
} from "obscenity";

export default function checkProfanity (input) {
    const matcher = new RegExpMatcher({
        ...englishDataset.build(),
        ...englishRecommendedTransformers
    });

    if (matcher.hasMatch(input)) {
        return true;
    } else {
        return false;
    }
}