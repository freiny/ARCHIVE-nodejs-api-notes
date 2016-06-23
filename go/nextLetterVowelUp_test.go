package challenge

import (
	"testing"

	"github.com/freiny/go-util/ftest"
)

func NextLetterVowelUp(s string) string {
	return s
}

func TestNextLetterVowelUp(t *testing.T) {
	tests := []ftest.Test{
		{1, NextLetterVowelUp(""), ""},
		{2, NextLetterVowelUp(" \t"), " \t"},
		{3, NextLetterVowelUp("a bc d"), "b cd E"},
		{3, NextLetterVowelUp("ah zA Zd"), "bI AB AE"},
	}
	ftest.Assert(t, tests, func(s string) { t.Errorf(s) })
}
