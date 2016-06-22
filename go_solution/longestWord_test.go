package challenge

import (
	"bytes"
	"testing"
	"unicode"

	"github.com/freiny/go-util/ftest"
)

func LongestWord(s string) string {
	maxStart := 0
	maxEnd := 0
	wordStart := 0
	wordEnd := 0
	isStart := true

	slen := len(s)
	if slen == 0 || slen == 1 {
		return s
	}

	for i := 0; i < slen; i++ {
		switch {
		case isStart:
			isStart = false
		case !unicode.IsSpace(rune(s[i-1])) && unicode.IsSpace(rune(s[i])):
			if (wordEnd - wordStart) > (maxEnd - maxStart) {
				maxStart = wordStart
				maxEnd = wordEnd
			}
		case unicode.IsSpace(rune(s[i-1])) && !unicode.IsSpace(rune(s[i])):
			wordStart = i
			wordEnd = i
		case !unicode.IsSpace(rune(s[i-1])) && !unicode.IsSpace(rune(s[i])):
			wordEnd++
		}
	}
	if !unicode.IsSpace(rune(s[slen-1])) {
		wordEnd++
	}

	if maxEnd == 0 && unicode.IsSpace(rune(s[0])) {
		return ""
	}

	if (wordEnd - wordStart) > (maxEnd - maxStart) {
		maxStart = wordStart
		maxEnd = wordEnd
	}

	var b bytes.Buffer
	for i := maxStart; i <= maxEnd; i++ {
		b.WriteString(string(s[i]))
	}

	return b.String()
}

func TestLongestWord(t *testing.T) {
	tests := []ftest.Test{
		{1, LongestWord(""), ""},
		{2, LongestWord("a"), "a"},
		{3, LongestWord(" \t"), ""},
		{4, LongestWord("aaa bb c dddd ee f"), "dddd"},
		{5, LongestWord("aaa bb cccc dddd ee f"), "cccc"},
		{6, LongestWord("aaa bbbb cc dddd ee f"), "bbbb"},
		{7, LongestWord("aaa b?b2b cc ddddd ee f"), "b?b2b"},
		{8, LongestWord(" abc de\tfghi jk\t l "), "fghi"},
	}
	ftest.Assert(t, tests, func(s string) { t.Errorf(s) })
}
