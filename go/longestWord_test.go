package challenge

import (
	"testing"

	"github.com/freiny/go-util/ftest"
)

func LogestWord(s string) string {
	return s
}

func TestLogestWord(t *testing.T) {
	tests := []ftest.Test{
		{1, LogestWord(""), ""},
		{2, LogestWord(" \t"), ""},
		{3, LogestWord("aaa bb c dddd ee f"), "dddd"},
		{4, LogestWord("aaa bb cccc dddd ee f"), "cccc"},
		{5, LogestWord("aaa bbbb cc dddd ee f"), "bbbb"},
		{5, LogestWord("aaa bbb2b cc dddd ee f"), "bbb2b"},
		{6, LogestWord(" abc de\tfghi jk\t l "), "fghi"},
	}
	ftest.Assert(t, tests, func(s string) { t.Errorf(s) })
}
